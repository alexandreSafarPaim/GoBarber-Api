import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import User from '../../../../users/infra/typeorm/entities/User'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column('time with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  //Não precisa mais do constructor ao usar o typeorm
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid()
  //   this.provider = provider
  //   this.date = date
  // }
  //o erro é devido a não ter uma inicialização para as variaveis
  //para remover os erros de sintaxe deve-se setar no tsconfig.json "strictPropertyInitialization": false,
}

export default Appointment
