import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumberString()
  lat: string;

  @IsOptional()
  @IsNumberString()
  lng: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class LoginCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SerializedCustomer {
  email: string;
  name: string;
  contactNumber: string;
  lat: number;
  lng: number;
  address: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedCustomer>) {
    Object.assign(this, partial);
  }
}
