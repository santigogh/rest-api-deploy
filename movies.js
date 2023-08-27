const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title mus be a sring',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {
            invalid_type_error: 'Movie title mus be an array of enum Genre',
            required_error: 'Movie genre is required'
        }
    )
})

function validateMovie (objetc){
    return movieSchema.safeParse(objetc)
}

function validatePartialMovie (objetc){
    return movieSchema.partial().safeParse(objetc)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}