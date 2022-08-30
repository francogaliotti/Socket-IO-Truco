'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    image: string;
    password: string
  }
  
  interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}
  
  interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
      UserAttributes {
        createdAt?: Date;
        updatedAt?: Date;
      }
  
  const User = sequelize.define<UserInstance>(
    'User',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      username: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      image: {
        allowNull: true,
        type: DataTypes.TEXT,
      }
    }
  );
  
  export default User;