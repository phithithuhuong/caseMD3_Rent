const navbar = `
<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: darkolivegreen;">

            <a class="navbar-brand" href="/home">
                <img src="https://static1.cafeland.vn/cafelandData/upload/tintuc/tuvanhoidap/2016/12/tuan-03/nha-cho-thue-1482327802.jpg"
                     alt="Logo" style="width:40px;" class="rounded-pill">
            </a>
<button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation"></button>
<div class="collapse navbar-collapse" id="collapsibleNavId">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
            <a class="nav-link" href="/home">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/room/add">Add</a>
        </li>
       
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/user" id="dropdownId" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">User</a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
                <a class="dropdown-item" href="/user/edit-info">Edit Info</a>
                <a class="dropdown-item" href="/user/change-password">Change Password</a>
                <a class="dropdown-item" href="/user/logout">Log out</a>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/room">Room</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/rent">Rent</a>
        </li>
       
         <form class="form-inline my-2 my-lg-0" method="post" action="/room/search">
            <input class="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </ul>
</div>
</nav>
`;
module.exports = navbar;
