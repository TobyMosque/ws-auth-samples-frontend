import { discard } from 'src/utils';
import { ComputedRef, Ref, WritableComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

interface ValidationInterfaces<
  TRequired,
  TEmail,
  TServer,
  TCompare,
  TStrength
> {
  required: TRequired;
  email: TEmail;
  server: TServer;
  compare: TCompare;
  strength: TStrength;
}

type ValidationFn = (val: unknown) => boolean | string;
type ValidationFactory = (ctx: ValidationParams<string>) => ValidationFn;
type ValidationFactories = ValidationInterfaces<
  ValidationFactory,
  ValidationFactory,
  ValidationFactory,
  ValidationFactory,
  ValidationFactory
>;
type ValidationContext<T> = Partial<
  ValidationInterfaces<
    boolean,
    boolean,
    Ref<boolean | string>,
    { field: T; val: RefType<unknown> },
    RefType<number>
  >
>;
type ValidationContextFields<T> = Record<string, ValidationContext<T>>;

interface ValidationParams<T extends string> {
  field: string;
  prefix?: string;
  ctx?: ValidationContextFields<T>;
}

function success(val: unknown) {
  discard(val);
  return true;
}

type RefType<T> = Ref<T> | ComputedRef<T> | WritableComputedRef<T>;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validations: ValidationFactories = {
  required({ field, prefix = 'fields' }: ValidationParams<string>) {
    const i18n = useI18n();
    return function required(val: unknown) {
      return (
        !!val ||
        i18n.t('validations.required', {
          field: i18n.t(`${prefix}.${field}`),
        })
      );
    };
  },
  email({ field, prefix = 'fields' }: ValidationParams<string>) {
    const i18n = useI18n();
    return function email(val: unknown) {
      return (
        emailRegex.test(val as string) ||
        i18n.t('validations.email', {
          field: i18n.t(`${prefix}.${field}`),
        })
      );
    };
  },
  server({ field, ctx }: ValidationParams<string>) {
    if (!ctx || !ctx[field]) {
      return success;
    }
    const arg = ctx[field];
    if (!arg.server) {
      return success;
    }
    const server = arg.server;
    return function (val: unknown) {
      discard(val);
      return server.value;
    };
  },
  compare({ field, prefix = 'fields', ctx }: ValidationParams<string>) {
    if (!ctx || !ctx[field]) {
      return success;
    }
    const arg = ctx[field];
    if (!arg.compare) {
      return success;
    }
    const i18n = useI18n();
    const compare = arg.compare;
    return function (val: unknown) {
      return (
        val === compare.val.value ||
        i18n.t('validations.compare', {
          field: i18n.t(`${prefix}.${field}`),
          other: i18n.t(`${prefix}.${compare.field}`),
        })
      );
    };
  },
  strength({ field, prefix = 'fields', ctx }: ValidationParams<string>) {
    if (!ctx || !ctx[field]) {
      return success;
    }
    const arg = ctx[field];
    if (!arg.strength) {
      return success;
    }
    const i18n = useI18n();
    const strength = arg.strength;
    return function (val: unknown) {
      discard(val);
      return (
        strength.value >= 0.6 ||
        i18n.t('validations.strength', {
          field: i18n.t(`${prefix}.${field}`),
        })
      );
    };
  },
};

type Validation<T extends Record<string, ValidationContext<keyof T>>> = Record<
  keyof T,
  ValidationFn[]
> & { resetServer: () => void };

export function useValidation<T extends ValidationContextFields<keyof T>>(
  context: T,
  prefix = 'fields'
): Validation<T> {
  const _validations: Validation<never> = {
    resetServer() {
      for (const field in context) {
        const server = context[field].server;
        if (server) {
          server.value = true;
        }
      }
    },
  } as never;
  for (const field in context) {
    const _rules: ValidationFn[] = [];
    const rules = Object.keys(context[field]) as (keyof ValidationContext<T>)[];
    const names = Object.keys(validations) as (keyof ValidationFactories)[];
    for (const rule of names) {
      if (rules.includes(rule)) {
        _rules.push(
          validations[rule]({ field, prefix, ctx: context as never })
        );
      }
    }
    _validations[field] = _rules as never;
  }
  return _validations;
}
