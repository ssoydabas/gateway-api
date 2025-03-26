import { AnyZodObject, ZodError } from 'zod';
import httpStatus from 'http-status';
import { CustomError } from '@/errors/customError';

/**
 * Middleware generator for request validation using Zod schemas
 *
 * This middleware validates different parts of an HTTP request (body, query, params) against
 * a provided Zod schema. It ensures that incoming request data matches the expected format
 * before reaching the route handler.
 *
 * The validation process:
 * 1. Extracts relevant validation schemas for req.params, req.query, and req.body
 * 2. Extracts corresponding data from the request
 * 3. Validates each part against its schema
 * 4. If validation passes, attaches validated data to req.validatedData
 *
 * @param {AnyZodObject} schema - A Zod schema object that can contain validation rules for:
 *   - body: Request body validation schema
 *   - query: URL query parameters validation schema
 *   - params: URL path parameters validation schema
 *
 * @returns {Function} Express middleware function that:
 *   - On success: Attaches validated data to req.validatedData and calls next()
 *   - On validation failure: Passes CustomError with BAD_REQUEST status and validation error messages
 *   - On other errors: Passes the error to next error handler
 *
 * @example
 * // Validation schema
 * const createUserSchema = z.object({
 *   body: z.object({
 *     email: z.string().email(),
 *     password: z.string().min(6)
 *   }),
 *   query: z.object({}).optional(),
 *   params: z.object({}).optional()
 * });
 *
 * // Route definition
 * router.post('/users', validate(createUserSchema), userController.createUser);
 *
 * @throws {CustomError}
 *   - status: 400 (BAD_REQUEST)
 *   - message: Concatenated validation error messages
 */
const validate = (schema: AnyZodObject) => (req: any, _: any, next: any) => {
  try {
    const dataToValidate = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    req.validatedData = schema.parse(dataToValidate);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(', ');
      return next(
        new CustomError(
          httpStatus.BAD_REQUEST,
          'VALIDATION_ERROR',
          errorMessage,
          {
            errors: error.errors.map((e) => ({
              path: e.path.join('.'),
              message: e.message,
            })),
          },
        ),
      );
    }
    return next(error);
  }
};

export default validate;
