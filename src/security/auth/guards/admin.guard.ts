import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLE } from '../../roles/assets/enum/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = (request as any).user || (request.session as any)?.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userRole = user.role as ROLE;

    // Define admin roles
    const adminRoles = [
      ROLE.Administrator,
      ROLE.Founder,
      ROLE.Chief_Executive,
    ];

    if (!adminRoles.includes(userRole)) {
      throw new ForbiddenException(
        'Access denied. Administrator privileges required.',
      );
    }

    return true;
  }
}
