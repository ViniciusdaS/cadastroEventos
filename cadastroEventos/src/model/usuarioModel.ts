import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcryptjs'; 

@Entity('usuarios')
export class Usuarios {

    @PrimaryGeneratedColumn() 
    public id!: Number;

    @Column({ unique: false, nullable: false })
    public nome: string; 

    @Column({unique: true, nullable: false})
    public email: string

    @Column({ nullable: false })
    public senha: string;

    constructor(nome: string, email: string, senha: string) {this.nome = nome, this.email = email, this.senha = senha}


    // 🔐 Guardar a senha anterior para comparar no update
    private _previousPassword?: string;
  
    @BeforeInsert()
    async hashPasswordBeforeInsert() {
      const salt = await bcrypt.genSalt(10);
      this.senha = await bcrypt.hash(this.senha, salt);
    }
  
    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {

      if (this.senha !== this._previousPassword) {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
      }
    }
  
    // Quando o TypeORM carregar a entidade do banco, esse método é chamado aqui pegamos a senha original antes de qualquer update
    setPreviousPassword(password: string) {
      this._previousPassword = password;
    }
}