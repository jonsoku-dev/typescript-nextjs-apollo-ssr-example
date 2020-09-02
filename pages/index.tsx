/* eslint-disable */
import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { initializeApollo } from '../lib/apolloClient';
import { CurrentUserDocument, LogoutDocument, LogoutMutation } from '../generated/apolloComponents';
import { ApolloClient, NormalizedCacheObject, useMutation, useQuery } from '@apollo/client';

const IndexPage = () => {
    const { data, loading } = useQuery(CurrentUserDocument);

    useMutation<LogoutMutation>(LogoutDocument, {
        onError({ message }) {
            alert(message);
        },
        update(cache, { data }) {
            if (!data || !data.logout) {
                return;
            }
            cache.writeQuery({
                query: CurrentUserDocument,
                data: {
                    currentUser: data.logout,
                },
            });
        },
    });

    if (loading) {
        return <div>loading ...</div>;
    }

    if (!data) {
        return <div>loading ...</div>;
    }

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            {JSON.stringify(data)}
            <Link href="/about">
                <a>About</a>
            </Link>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
    const res = await apolloClient.query({
        query: CurrentUserDocument,
        context: {
            headers: {
                cookie: ctx.req.headers.cookie,
            },
        },
    });
    apolloClient.writeQuery({
        query: CurrentUserDocument,
        data: {
            currentUser: res.data?.currentUser,
        },
    });
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
};

export default IndexPage;
