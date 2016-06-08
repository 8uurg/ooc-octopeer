/**
 * This interface is used to define the structure of a repository in the RESTful API.
 */
interface RepositoryJSON {

    /**
     * The URL of the repository.
     */
    url?: string;

    /**
     * The owner of the repository.
     */
    owner: string;

    /**
     * The name of the repository.
     */
    name: string;

    /**
     * The platform this repository exists on.
     */
    platform: string;
}