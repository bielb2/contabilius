import { makeAutoObservable } from 'mobx';

import { safeNumber } from 'src/utils/safeParser';

export type UserConstructor = {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | undefined;
  // TODO: Verify if roles_id and companies_id are required
  roles_id: number | undefined;
  companies_id: number | undefined;
  profile_photo_url: string | undefined;
};

export class UserModel {
  id: UserConstructor['id'] = null!;

  name: UserConstructor['name'] = null!;

  email: UserConstructor['email'] = null!;

  email_verified_at: UserConstructor['email_verified_at'] = null!;

  roles_id: UserConstructor['roles_id'] = null!;

  companies_id: UserConstructor['companies_id'] = null!;

  profile_photo_url: UserConstructor['profile_photo_url'] = null!;

  constructor(data: UserConstructor) {
    makeAutoObservable(this);

    const { id, name, email, email_verified_at, roles_id, companies_id, profile_photo_url } = data;

    if (id == null) {
      throw new Error('User id cannot be null');
    }

    this.id = id;
    this.name = String(name);
    this.email = String(email);
    this.email_verified_at = email_verified_at != null ? new Date(email_verified_at) : undefined;
    this.roles_id = roles_id ?? undefined;
    this.companies_id = companies_id != null ? safeNumber(companies_id) : undefined;
    this.profile_photo_url = profile_photo_url != null ? String(profile_photo_url) : undefined;
  }
}
