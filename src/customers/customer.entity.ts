import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Customer {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column("varchar", { length: 30, unique: true })
	email!: string;

	@Column("varchar", { length: 20, nullable: true })
	phone!: string;

	@Column("varchar", { length: 100 })
	name!: string;

	@Column("boolean", { default: false })
	deleted!: boolean;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
