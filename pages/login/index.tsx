import React, {FunctionComponent} from 'react';
import {ApolloClient, NormalizedCacheObject, useQuery} from "@apollo/client";
import {GetServerSideProps} from "next";
import {initializeApollo} from "../../lib/apolloClient";
import {CurrentUserDocument} from "../../generated/apolloComponents";

interface OwnProps {
}

type Props = OwnProps;

const Index: FunctionComponent<Props> = () => {
    const {data, loading} = useQuery(CurrentUserDocument)
    if(loading || !data) {
        return <div>Loading ...</div>
    }
    return (<div>{JSON.stringify(data)}</div>);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo()
    const res = await apolloClient.query({
        query: CurrentUserDocument,
        context: {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        }
    })
    apolloClient.writeQuery({
        query: CurrentUserDocument,
        data: {
            currentUser: res.data?.currentUser
        }
    })
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        }
    };
};


export default Index;
