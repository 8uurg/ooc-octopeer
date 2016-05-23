/**
 * Created by Cas on 23-5-2016.
 * This interface is used to define the structure of a pull request in the RESTful API.
 */
interface PullRequestJSON {

    /**
     * The repository object this pull request affects.
     */
    repository: RepositoryJSON;

    /**
     * The number of this pull request.
     */
    PRnumber: number;
}