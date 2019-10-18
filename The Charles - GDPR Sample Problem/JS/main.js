const cookieConsentBox = document.querySelector('.cookie-consent');
const cookieAcceptBtn = document.querySelector('.cookie-confirm');
const today = new Date()

document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM Contentloaded!')
    // console.log('cookie check', document.cookie)
    // console.log('time check:', time)

    const getCookie = (name) => {
        let match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
        return match ? match[1] : null;
    }


    const deleteCookie = (name) => {
        console.log('Deleting cookie (by setting it to the past)...', document.cookie)
        document.cookie = name + "=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 UTC;";
    }
    

    const showConsentBox = () => {
        cookieConsentBox.style.display = 'flex';
    }


    const hideConsentBox = () => {
        cookieConsentBox.style.display = 'none';
    }
    

    // Check for cookie (activated on refresh) 
    const checkForCookie = () => {
        let userCookie = getCookie('cookieName')
        let expirationDate = getCookie('expires')

        if (userCookie === null) {
            console.log('No cookie found.')
            showConsentBox()
        } else {
            console.log('A cookie exists. Its name is:', userCookie)
            console.log('Its expiration is:', expirationDate)
            console.log('The date for today is:', today)

            hideConsentBox()
            maintainCookie(expirationDate)
        }
    }


    // A simple cookie is set with a six month expirey date.
    const createUserCookie = () => {
        console.log('Setting cookie...')
        let expDate = new Date;
        expDate.setMonth(expDate.getMonth() + 6)
        // Uncomment below statement to test expiration using minutes: 
        // expDate.setMinutes(expDate.getMinutes() + 2)
        expDate.toUTCString();
        document.cookie = `cookieName=bananas`; 
        document.cookie = `expires=${expDate}`;
        console.log('Cookie has been set. See here: ', document.cookie)
    }    


    // Upon user acceptance, command to create a cookie and hide consent box invoked.
    cookieAcceptBtn.addEventListener("click", (event) => {
        event.preventDefault();
        createUserCookie();
        tempRemoveConsentBox();
    });


    // Hides the cookie consent box.
    const tempRemoveConsentBox = () => {
        setTimeout(() => { 
            cookieConsentBox.style.display = 'none';
        }, 1000);
    }


    //Deletes cookie if cookie's expiration date has hit or is past due.
    const maintainCookie = (dateInput) => {
        if (dateInput) {
            if (Date.parse(dateInput) <= Date.parse(today)) {
                console.log('The cookie expired already. Deleting cookie...')
                deleteCookie('cookieName')
            }
        }
    }

    // Uncomment below delete cookie to test.
    // deleteCookie('cookieName') 

    checkForCookie()
    
    
});