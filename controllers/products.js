const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({price:{$gt:30}}).sort('price')
    res.status(200).json({ nbHits:products.length, products });
}
const getAllProducts = async (req,res) => {
     /*req.query me devuelve los parametros que el usuario ingreso. 
    Ejemplo: {name:'armchair', featured:true} 
    entonces filtro directamente por esto 
     */

    const { featured, company , name, sort, fields, numericFilter} = req.query; //uno de los posibles argumentos es sort
    const queryObject = {}

    if (featured) {
        //filter by wether the product is featured or not
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        //filter by company
        queryObject.company = company;
    }
    if (name) {
        //Filter by prodct name
        queryObject.name = { $regex:name, $options:'i' };
        //Regex allows to search by substring also
        //Ex i search for "tab" and it'll show results for "table" and every other product name that contains "tab"
    }

    let result = Product.find(queryObject);

    if (sort) {
        //i get all the things that the list is gonna be sorted by
        const sortList = sort.split(',').join(' '); 
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt');
    }
    if (fields) {
        //Select is for showing some selected fields only
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList);
    }
    if (numericFilter) {
        const list = numericFilter.split(',').join(' ')

        const operatorMap = {
            //'sent as parameter' : 'what mongoose understand'
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq'
        }

        const regularExpression = /\b(<|>|>=|=|<=)\b/g 
        let filers = numericFilters.replace(
            regularExpression,
            (match)=>`-${operatorMap[match]}-`)
        
        const options = ['price','rating']; //the two numeric fields
        filters = filters.split(',').forEach((item)=> {
            const [field,operator,value] = items.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
        console.log(queryObject)
    }
    

    const page = Number(req.query.page) || 1;
 
    const skip = (page-1) * limit 
    //i implement pagination. If page=3 and limit(amount of results per page)=10 its gonna skip the first 20 elements, so im in page 3 

    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({ products, nbHits:products.length });
    //nbHits is only to know how many products i got as response
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}