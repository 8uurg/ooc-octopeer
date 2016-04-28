/**
 * Created by larsstegman on 28-04-16.
 * This interface is used to convert Repository data to a definite type.
 */
interface Repository {
    /**
     * The full repo url, without "bitbucket.org"
     */
    fullslug: string;

    /**
     * The repo title.
     */
    slug: string;
    
    /**
     * The repo bitbucket id. 
     */
    id: number;

    /**
     * The programming language used in this repo.
     */
    language: string;
}