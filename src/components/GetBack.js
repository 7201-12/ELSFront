function GetBack(navigate, location) {
    const from = location.state?.from?.pathname || "/";
    navigate(from, {replace: true});
}

export default GetBack