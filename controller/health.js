function get (req, res) {
    const resObj = {
        message: "Health Check",
        data: true
    }
    res.status(200).json(resObj);
}

function post (req, res) {
    const body = req.body;
    res.status(200).json({
        data: body,
    })
}

const healthController = { get , post };

export default healthController;