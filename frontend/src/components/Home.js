import React, { useEffect, useState } from "react";


const Home = () => {

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }

    

    return (
        <div>
            <h1>This is the Home</h1>
            <div class="g-signin2" data-onsuccess={onSignIn}></div>
        </div>  
      
    );
}

export default Home;