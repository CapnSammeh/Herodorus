# TypeORM Overview/Notes

## Installation

### Installation of Modules
```
npm install typeorm --save
npm install reflect-metadata --save
npm install @types/node --save-dev

npm install pg --save
```
### TypeScript Configuration
Add the following to ```app.ts```:
```ts
import "reflect-metadata"
```

Add the following to ```tsconfig.json```:
```ts
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## QuickStart
1. Install TypeORM globally: ```npm install typeorm -g```
1. Nav to directory and run 

## Active Record vs. Data Mapper

### Active Record Pattern
Active Record approach requires you to define all of your query methods *inside* the model itself, and you save, remove and load objects *using* the model methods.

All active-record entities must extend the BaseEntity class, which provides methods to work with the entity.

#### Example 1: Defining a Data Entity
```ts
//Perform the imports required to leverage TypeORM
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

//This is an example of AtScript: https://github.com/ATScriptDev/ATScript
@Entity()

//Export a new class that extends the BaseEntity Class
export class User extends BaseEntity {

    //Generate a PK Column called ID with a type of Number
    @PrimaryGeneratedColumn()
    id: number;

    //Generate a First Name column with a type of String
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

}
```

#### Example 2: CRUD Activities
```ts
//First, create a new User Entity
const user = new User();

//Declare it's params
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;

//Await the response of User.Save() to save the record to the DB
await user.save();


//Second, lets remove the entity we just created.
//This uses the same object declarations as above, so you would basically just repeat the process.
await user.remove();

//Finally, lets query a bunch of records using .find() and .findOne().
const users = await User.find({ skip: 2, take: 5 });
const newUsers = await User.find({ isActive: true });
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });
```

### Data Mapper Pattern
Data Mapper Approach requires you to define all of your query methods in separate classes called 'repositories'; these repositories are used ot save, remove and load objects.

In Data Mapper, your entities are *dumb*; they just define their properties and may have some dummy methods; this means that all the logic is done separately to the model. 

#### Example 1: Defining a Data Entity
Note: This is exactly the same definition as AR.
```ts
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

}
```

#### Example 2: Working with DM
```ts
const userRepository = connection.getRepository(User);

// example how to save DM entity
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await userRepository.save(user);

// example how to remove DM entity
await userRepository.remove(user);

// example how to load DM entities
const users = await userRepository.find({ skip: 2, take: 5 });
const newUsers = await userRepository.find({ isActive: true });
const timber = await userRepository.findOne({ firstName: "Timber", lastName: "Saw" });
```

## Which should we use?
One thing we should always keep in mind with software development is how we are going to maintain our applications. 
 - The Data Mapper approach helps with maintainability, which is more effective in bigger apps. 
 - The Active record approach helps keep things simple which works well in smaller apps, and simplicity is always a key to better maintainability.

## Decisions
For Herodorus; we're going to use a Data Mapper Pattern for interacting with the DB; this is one step of abstraction above what Max is doing in CASMAN, but as we're doing something relatively simple, I think it's an appropriate decision to make. 

By using a DM pattern instead of the arguably simpler AR pattern, we're still getting some meaningful development in, and getting a better understanding of TypeScript and using TypeORM, without all the overhead of building our own ORM entails. 

## Links
https://typeorm.io/#/