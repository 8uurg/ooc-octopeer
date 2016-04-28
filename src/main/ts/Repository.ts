/**
 * Created by larsstegman on 28-04-16.
 * This interface is used to convert Repository data to a definite type.
 */
interface Repository {
    fullslug: string;
    slug: string;
    id: number;
    language: string;
}