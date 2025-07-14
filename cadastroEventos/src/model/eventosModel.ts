import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('eventos')
export class Eventos {

    @PrimaryGeneratedColumn() 
    public id!: number;

    @Column({ nullable: false })
    public nome: string;

    @Column({ nullable:false })
    public local: string;
    
    @Column({ nullable:false })
    public data: string;

    constructor(nome: string, local: string, data: string) {
        this.nome = nome;
        this.local = local; 
        this.data = data;
    }
}