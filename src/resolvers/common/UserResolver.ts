import { Query,Resolver } from "type-graphql";


@Resolver()
export class UserResolver{
    @Query((type)=> String)
    public async hello(): Promise<string>{
        return 'world' + new Date().getTime();
    }
}