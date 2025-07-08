export default function (err, req, res, next) {
    console.error(err);

    if(err.name === "ValidationError"){
        const statusCode = 400;
        res.status(statusCode).json({ message : err.message })
    }

    res.status(500).json({message : "서버 내부에서 에러가 발생했습니다"});
}