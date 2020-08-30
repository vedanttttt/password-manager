module.exports = (req,res,next)=>{
  console.log('External middleware working');
  next();
}