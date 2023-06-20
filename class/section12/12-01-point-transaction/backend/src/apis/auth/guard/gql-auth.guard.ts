import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export const GqlAuthGuard = (name: string) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
  };
};
