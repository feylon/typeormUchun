import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Bu dekoratorni qo'shishni unutmang!
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' }) // Type qo'shildi
    name!: string;

    @Column({ type: 'varchar' }) // Type qo'shildi
    firstname!: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    username!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    password!: string;
}