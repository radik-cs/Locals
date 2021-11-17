export default function CreateEvents() {
    return (
        <form >
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                   
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    
                />
            </div>

            <p> </p>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    );

}