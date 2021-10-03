import '../public/css/global.css';

import App from 'next/app';
import Head from 'next/head';

const {User} = require('../mongodb.js');

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        if (ctx.req && ctx.req.session && ctx.req.session.passport) {
            pageProps.user = await User.findOne({username: ctx.req.session.passport.user}).lean();
        }
        
        return { pageProps };
    }
    
    constructor(props) {
        super(props);
        this.state = {
            user: props.pageProps.user
        };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>Just Egg Comics</title>
                </Head>
                <NavBar />
                    <Component {...pageProps} />
                <Footer />
            </>
        )
    }
}