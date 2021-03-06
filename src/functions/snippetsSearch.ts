import algoliasearch from 'algoliasearch/lite';
import { performance } from '../firebase';
import logEvent from '../utils/logEvent';

const searchClient = algoliasearch( process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_SEARCH_API_KEY );
const snippetIndex = searchClient.initIndex( 'snippets' );

interface SearchResult {
    pages: number;
    page: number;
    results: any[];
}

export default ( query: string, page: number = 0 ): Promise<SearchResult> => {
    return new Promise( ( resolve, reject ) => {
        logEvent( 'search', { search_term: query } );
        const trace = performance.trace( 'snippetsQuery' );
        trace.start();
        snippetIndex
            .search( { query, page } )
            .then( ( result ) => {
                trace.stop();
                resolve( {
                    pages: result.nbPages,
                    page: result.page,
                    results: result.hits.map( ( hit ) => {
                        hit.id = hit.objectID;
                        delete hit.objectID;
                        return hit;
                    } )
                } );
            } )
            .catch( ( e ) => {
                trace.stop();
                reject( e );
            } );
    } );
};
