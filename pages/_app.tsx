import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Head from 'next/head';

const App = ({ Component, pageProps }: any) => {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Tamastudy</title>
            </Head>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </>
    );
};

export default App;
