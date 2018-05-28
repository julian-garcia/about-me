function userInfoHTML(user) {
    return `<h2>${user.name}
                <span class="small-name">
                    (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
                </span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                    </a>
                </div>
                <p>Followers: ${user.followers}, Following: ${user.following}<br> Public Repos: ${user.public_repos}</p>
            </div>`;
}

function fetchGitHubInfo(event) {
    var username = $("#gh-username").val();
    
    if (!username) {
        $("#gh-user-data").html("<h3>Please enter GitHub user name</h3>");
        return;
    }
    
    $("#gh-user-data").html(`<div id="loader"><img src="/assets/images/loading.gif" alt="Loading..." /></div>`);
    
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response) {
            var user_data = response;
            $("#gh-user-data").html(userInfoHTML(user_data));
        }, 
        function(errorResponse) {
            if (errorResponse.status == 404) {
                $("#gh-user-data").html(`<h4>No info found for ${username}</h4>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h4>Error: ${errorResponse.reponseJSON.message}</h4>`);
            }
        }
    );
}