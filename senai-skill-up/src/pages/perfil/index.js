import React from "react";
import { Header, MeioFooter, Footer, ProfileHeader, ProfileStatus, ProfileRanking, ProfileHistory,  DeleteAccountModal } from '../../components/index';
import "./style.css";

export default function Perfil() {
    return (
        <>
            <Header />
            <ProfileHeader />
            <ProfileStatus />
            <ProfileRanking />
            <ProfileHistory />
            <DeleteAccountModal />
            <MeioFooter />
            <Footer />
        </>
    );
}
