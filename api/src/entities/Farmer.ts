import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, IsIn } from "class-validator";

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  document: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  farmName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  state: string;

  @Column("decimal")
  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @Column("decimal")
  @IsNotEmpty()
  @IsNumber()
  agriculturalArea: number;

  @Column("decimal")
  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @Column("simple-array")
  @IsIn(["Soja", "Milho", "Algodão", "Café", "Cana de Açucar"], { each: true })
  crops: string[];
}
