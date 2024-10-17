/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: User management and login
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retrieve a list of all registered users
 *     description: Requires a valid JWT token in the header (x-access-token) and administrator privileges.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Token generated upon login to authorize the request.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided
 *       403:
 *         description: Forbidden - User is not an administrator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied. You do not have permission to perform this action.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to authenticate token
 */

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate the user with a valid username and password. Returns a JWT token if the credentials are correct.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_usuario
 *               - contrasenia_usuario
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *                 description: Username of the user
 *                 example: Admin
 *               contrasenia_usuario:
 *                 type: string
 *                 description: Password of the user
 *                 example: nFF4P)08[7q3
 *     responses:
 *       200:
 *         description: Login successful - Returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Indicates if the user is authenticated
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: JWT token to be used for authenticated requests
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred during login
 */

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows an administrator to register a new user in the system. It requires a valid JWT token for authentication and administrative privileges.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Token generated upon login to authorize the request.
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *                 description: Username of the new user.
 *                 example: "john_doe"
 *               contrasenia_usuario:
 *                 type: string
 *                 description: Password for the new user.
 *                 example: "SecurePassword123!"
 *               email_usuario:
 *                 type: string
 *                 description: Email address of the new user.
 *                 example: "john.doe@example.com"
 *               tipo_usuario:
 *                 type: string
 *                 description: Type of user (e.g., 'ADMINISTRADOR', 'ENTIDAD', etc.).
 *                 example: "ENTIDAD"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                   description: Unique identifier for the user
 *                 nombre_usuario:
 *                   type: string
 *                   description: Username of the created user
 *                 email_usuario:
 *                   type: string
 *                   description: Email address of the created user
 *                 tipo_usuario:
 *                   type: string
 *                   description: Type of the created user
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
