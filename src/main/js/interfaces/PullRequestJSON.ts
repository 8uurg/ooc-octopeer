/**
 * Created by Cas on 23-5-2016.
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