$(document).ready(function() {
    fetchGitHubInfo();
});

function userInfoHTML(user) {
    return `<h2>${user.name}
                <span class="small-name">
                    (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
                </span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url}" target="_blank">
                    <img class="img-thumbnail" src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                    </a>
                </div>
                <p>Followers: ${user.followers}, Following: ${user.following}<br> Public Repos: ${user.public_repos}</p>
            </div>`;
}

function repoInfoHTML(repos) {
    var listItemsHTML = repos.map(function(repo) {
        return `<a role="button" class="btn btn-primary repo-button" href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    });
    return listItemsHTML;
}

function fetchGitHubInfo(event) {
    $("#gh-user-data").html(``);
    $("#gh-repo-data").html(``);
    var username = $("#gh-username").val();
    
    if (!username) {
        $("#gh-user-data").html("<h3>Please enter GitHub user name</h3>");
        return;
    }
    
    $("#gh-user-data").html(`<div id="loader"><img src="/assets/images/loading.gif" alt="Loading..." /></div>`);
    
    $.when(
        $.getJSON(`https://api.github.com/users/${username}?access_token=b575ab5aec15a7a60b74bfe95045256be615ba6b`),
        $.getJSON(`https://api.github.com/users/${username}/repos?access_token=b575ab5aec15a7a60b74bfe95045256be615ba6b`)
    ).then(
        function(firstResponse, secondResponse) {
            var user_data = firstResponse[0];
            var repo_data = secondResponse[0];
            $("#gh-user-data").html(userInfoHTML(user_data));
            $("#gh-repo-data").html(repoInfoHTML(repo_data));
        }, 
        function(errorResponse) {
            if (errorResponse.status == 404) {
                $("#gh-user-data").html(`<h4>No info found for ${username}</h4>`);
            } else if (errorResponse.status == 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests. Please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h4>Error: ${errorResponse.reponseJSON.message}</h4>`);
            }
        }
    );
}