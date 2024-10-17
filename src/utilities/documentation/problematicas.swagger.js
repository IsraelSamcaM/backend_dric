/**
 * @swagger
 * tags:
 *   name: Problematicas
 *   description: Problem management
 */


/**
 * @swagger
 * /api/problematicas:
 *   get:
 *     summary: Retrieve a list of validated and available problematicas
 *     description: This endpoint returns a list of issues that are validated and published.
 *     tags: [Problematicas]
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
 *         description: A list of validated and available problematicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_problematica:
 *                     type: integer
 *                     description: Unique identifier for the problematic
 *                   titulo:
 *                     type: string
 *                     description: Title of the problematic
 *                   planteamiento:
 *                     type: string
 *                     description: Description of the problem
 *                   causas:
 *                     type: string
 *                     description: Causes of the problem
 *                   efectos:
 *                     type: string
 *                     description: Effects of the problem
 *                   que:
 *                     type: string
 *                     description: What the problem is
 *                   como:
 *                     type: string
 *                     description: How to address the problem
 *                   para_que:
 *                     type: string
 *                     description: Purpose of the problem
 *                   cuando:
 *                     type: string
 *                     description: When the problem occurs
 *                   contacto:
 *                     type: string
 *                     description: Contact information
 *                   contacto_nombre:
 *                     type: string
 *                     description: Contact name information
 *                   contacto_cargo:
 *                     type: string
 *                     description: Contact position information
 *                   telefono:
 *                     type: integer
 *                     description: Phone number for contact
 *                   telefono_institucional:
 *                     type: integer
 *                     description: Institutional phone number
 *                   zona:
 *                     type: string
 *                     description: Area of the problem
 *                   publicado:
 *                     type: string
 *                     format: date-time
 *                     description: Date the problem was published
 *                   activo:
 *                     type: boolean
 *                     description: Indicates if the problem is active
 *                   validado:
 *                     type: boolean
 *                     description: Indicates if the problem is validated
 *                   actualizado:
 *                     type: string
 *                     format: date-time
 *                     description: Last update date of the problem
 *                   creado:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date of the problem
 *                   usuario:
 *                     type: object
 *                     description: User who created the problem
 *                   solicitante_id:
 *                     type: integer
 *                     description: ID of the requester
 *                   solicitante:
 *                     type: object
 *                     description: Requester information
 *                   carreras:
 *                     type: array
 *                     items:
 *                       type: object
 *                       description: Related careers
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving problematicas
 */


/**
 * @swagger
 * /api/problematicas/{id_problematica}:
 *   get:
 *     summary: Retrieve a specific problematic by its ID
 *     description: This endpoint returns the details of a problematic by its unique ID.
 *     tags: [Problematicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Token generated upon login to authorize the request.
 *         required: true
 *         type: string
 *       - name: id_problematica
 *         in: path
 *         required: true
 *         description: The unique identifier of the problematic
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the problematic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_problematica:
 *                   type: integer
 *                   description: Unique identifier for the problematic
 *                 titulo:
 *                   type: string
 *                   description: Title of the problematic
 *                 planteamiento:
 *                   type: string
 *                   description: Description of the problem
 *                 causas:
 *                   type: string
 *                   description: Causes of the problem
 *                 efectos:
 *                   type: string
 *                   description: Effects of the problem
 *                 que:
 *                   type: string
 *                   description: What the problem is
 *                 como:
 *                   type: string
 *                   description: How to address the problem
 *                 para_que:
 *                   type: string
 *                   description: Purpose of the problem
 *                 cuando:
 *                   type: string
 *                   description: When the problem occurs
 *                 contacto:
 *                   type: string
 *                   description: Contact information
 *                 contacto_nombre:
 *                     type: string
 *                     description: Contact name information
 *                 contacto_cargo:
 *                     type: string
 *                     description: Contact position information
 *                 telefono:
 *                   type: integer
 *                   description: Phone number for contact
 *                 telefono_institucional:
 *                   type: integer
 *                   description: Institutional phone number
 *                 zona:
 *                   type: string
 *                   description: Area of the problem
 *                 publicado:
 *                   type: string
 *                   format: date-time
 *                   description: Date the problem was published
 *                 actualizado:
 *                   type: string
 *                   format: date-time
 *                   description: Last update date of the problem
 *                 creado:
 *                   type: string
 *                   format: date-time
 *                   description: Creation date of the problem
 *                 usuario:
 *                   type: object
 *                   description: User who created the problem
 *                 solicitante_id:
 *                   type: integer
 *                   description: ID of the requester
 *                 solicitante:
 *                   type: object
 *                   description: Requester information
 *                 carreras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Related careers
 *       404:
 *         description: Problematica not found or not published
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Problematica not found or not published
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving the problematic
 */

/**
 * @swagger
 * /api/problematicas/tabla:
 *   get:
 *     summary: Retrieve a table of validated and available problematicas
 *     description: This endpoint returns a list of validated and available problematicas. Access is restricted to users with the role 'ADMINISTRADOR'. A valid JWT token must be provided in the header as 'x-access-token'.
 *     tags: [Problematicas]
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
 *         description: A list of validated and available problematicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_problematica:
 *                     type: integer
 *                     description: Unique identifier for the problematic
 *                   titulo:
 *                     type: string
 *                     description: Title of the problematic
 *                   planteamiento:
 *                     type: string
 *                     description: Description of the problem
 *                   causas:
 *                     type: string
 *                     description: Causes of the problem
 *                   efectos:
 *                     type: string
 *                     description: Effects of the problem
 *                   que:
 *                     type: string
 *                     description: What the problem is
 *                   como:
 *                     type: string
 *                     description: How to address the problem
 *                   para_que:
 *                     type: string
 *                     description: Purpose of the problem
 *                   cuando:
 *                     type: string
 *                     description: When the problem occurs
 *                   contacto:
 *                     type: string
 *                     description: Contact information
 *                   contacto_nombre:
 *                     type: string
 *                     description: Contact name information
 *                   contacto_cargo:
 *                     type: string
 *                     description: Contact position information
 *                   telefono:
 *                     type: integer
 *                     description: Phone number for contact
 *                   telefono_institucional:
 *                     type: integer
 *                     description: Institutional phone number
 *                   zona:
 *                     type: string
 *                     description: Area of the problem
 *                   publicado:
 *                     type: string
 *                     format: date-time
 *                     description: Date the problem was published
 *                   activo:
 *                     type: boolean
 *                     description: Indicates if the publication is active
 *                   validado:
 *                     type: boolean
 *                     description: Indicates if the problematic is validated
 *                   actualizado:
 *                     type: string
 *                     format: date-time
 *                     description: Last update date of the problem
 *                   creado:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date of the problem
 *                   usuario:
 *                     type: object
 *                     description: User who created the problem
 *                   solicitante_id:
 *                     type: integer
 *                     description: ID of the requester
 *                   solicitante:
 *                     type: object
 *                     description: Requester information
 *                   carreras:
 *                     type: array
 *                     items:
 *                       type: object
 *                       description: Related careers
 *       403:
 *         description: Access restricted to administrators only
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access restricted to administrators only
 *       401:
 *         description: No token provided or token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No token provided
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving the problematicas
 */



/**
 * @swagger
 * /api/problematicas:
 *   post:
 *     summary: Create a new Problematica
 *     description: This endpoint allows an 'ADMINISTRADOR' to create a new Problematica. The request must include the necessary details for the Problematica and a valid JWT token must be provided in the header as 'x-access-token'.
 *     tags: [Problematicas]
 *     security:
 *       - bearerAuth: []
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
 *               titulo:
 *                 type: string
 *                 description: Title of the problematic
 *               planteamiento:
 *                 type: string
 *                 description: Description of the problem
 *               causas:
 *                 type: string
 *                 description: Causes of the problem
 *               efectos:
 *                 type: string
 *                 description: Effects of the problem
 *               que:
 *                 type: string
 *                 description: What the problem is
 *               como:
 *                 type: string
 *                 description: How to address the problem
 *               para_que:
 *                 type: string
 *                 description: Purpose of the problem
 *               cuando:
 *                 type: string
 *                 description: When the problem occurs
 *               contacto_cargo:
 *                 type: string
 *                 description: Position of the contact person
 *               contacto_nombre:
 *                 type: string
 *                 description: Name of the contact person
 *               telefono:
 *                 type: integer
 *                 description: Phone number for contact
 *               telefono_institucional:
 *                 type: integer
 *                 description: Institutional phone number
 *               zona:
 *                 type: string
 *                 description: Area of the problem
 *               id_solicitante:
 *                 type: integer
 *                 description: ID of the requester
 *               id_carrera:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs of related careers
 *               publicado:
 *                 type: boolean
 *                 description: Indicates if the problematic is published
 *     responses:
 *       201:
 *         description: Problematica created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_problematica:
 *                   type: integer
 *                   description: Unique identifier for the newly created problematic
 *                 titulo:
 *                   type: string
 *                   description: Title of the problematic
 *                 planteamiento:
 *                   type: string
 *                   description: Description of the problem
 *                 causas:
 *                   type: string
 *                   description: Causes of the problem
 *                 efectos:
 *                   type: string
 *                   description: Effects of the problem
 *                 que:
 *                   type: string
 *                   description: What the problem is
 *                 como:
 *                   type: string
 *                   description: How to address the problem
 *                 para_que:
 *                   type: string
 *                   description: Purpose of the problem
 *                 cuando:
 *                   type: string
 *                   description: When the problem occurs
 *                 contacto_cargo:
 *                   type: string
 *                   description: Position of the contact person
 *                 contacto_nombre:
 *                   type: string
 *                   description: Name of the contact person
 *                 telefono:
 *                   type: integer
 *                   description: Phone number for contact
 *                 telefono_institucional:
 *                   type: integer
 *                   description: Institutional phone number
 *                 zona:
 *                   type: string
 *                   description: Area of the problem
 *                 validado:
 *                   type: boolean
 *                   description: Indicates if the problematic is validated
 *                 disponible:
 *                   type: boolean
 *                   description: Indicates if the problematic is available
 *                 usuario_id:
 *                   type: integer
 *                   description: ID of the user who created the problematic
 *                 solicitante_id:
 *                   type: integer
 *                   description: ID of the requester
 *       403:
 *         description: Access restricted to administrators only
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access restricted to administrators only
 *       400:
 *         description: Bad request due to missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields or invalid data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating the problematic
 */

/**
 * @swagger
 * /api/problematicas/{id_problematica}:
 *   put:
 *     summary: Update an existing Problematica
 *     description: This endpoint allows users to update an existing Problematica. The request must include the Problematica ID as a URL parameter and the fields to update in the body. A valid JWT token must be provided in the header as 'x-access-token'.
 *     tags: [Problematicas]
 *     parameters:
 *       - name: id_problematica
 *         in: path
 *         required: true
 *         description: Unique identifier of the Problematica to be updated
 *         type: integer
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
 *               titulo:
 *                 type: string
 *                 description: Title of the problematic
 *               planteamiento:
 *                 type: string
 *                 description: Description of the problem
 *               causas:
 *                 type: string
 *                 description: Causes of the problem
 *               efectos:
 *                 type: string
 *                 description: Effects of the problem
 *               que:
 *                 type: string
 *                 description: What the problem is
 *               como:
 *                 type: string
 *                 description: How to address the problem
 *               para_que:
 *                 type: string
 *                 description: Purpose of the problem
 *               cuando:
 *                 type: string
 *                 description: When the problem occurs
 *               contacto_cargo:
 *                 type: string
 *                 description: Position of the contact person
 *               contacto_nombre:
 *                 type: string
 *                 description: Name of the contact person
 *               telefono:
 *                 type: integer
 *                 description: Phone number for contact
 *               telefono_institucional:
 *                 type: integer
 *                 description: Institutional phone number
 *               zona:
 *                 type: string
 *                 description: Area of the problem
 *               id_solicitante:
 *                 type: integer
 *                 description: ID of the requester
 *               id_carrera:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs of related careers
 *     responses:
 *       200:
 *         description: Problematica updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_problematica:
 *                   type: integer
 *                   description: Unique identifier for the updated problematic
 *                 titulo:
 *                   type: string
 *                   description: Title of the problematic
 *                 planteamiento:
 *                   type: string
 *                   description: Description of the problem
 *                 causas:
 *                   type: string
 *                   description: Causes of the problem
 *                 efectos:
 *                   type: string
 *                   description: Effects of the problem
 *                 que:
 *                   type: string
 *                   description: What the problem is
 *                 como:
 *                   type: string
 *                   description: How to address the problem
 *                 para_que:
 *                   type: string
 *                   description: Purpose of the problem
 *                 cuando:
 *                   type: string
 *                   description: When the problem occurs
 *                 contacto_cargo:
 *                   type: string
 *                   description: Position of the contact person
 *                 contacto_nombre:
 *                   type: string
 *                   description: Name of the contact person
 *                 telefono:
 *                   type: integer
 *                   description: Phone number for contact
 *                 telefono_institucional:
 *                   type: integer
 *                   description: Institutional phone number
 *                 zona:
 *                   type: string
 *                   description: Area of the problem
 *                 validado:
 *                   type: boolean
 *                   description: Indicates if the problematic is validated
 *                 disponible:
 *                   type: boolean
 *                   description: Indicates if the problematic is available
 *                 usuario_id:
 *                   type: integer
 *                   description: ID of the user who updated the problematic
 *                 solicitante_id:
 *                   type: integer
 *                   description: ID of the requester
 *       404:
 *         description: Problem not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Problem not found
 *       403:
 *         description: You cannot edit a validated problem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You cannot edit a validated problem
 *       400:
 *         description: Bad request due to missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields or invalid data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating the problematic
 */

/**
 * @swagger
 * /api/problematicas/{id_problematica}:
 *   delete:
 *     summary: Delete a Problematica
 *     description: This endpoint allows administrators to delete a Problematica. It requires a valid JWT token and the user must have the ADMINISTRADOR role. The request must include the Problematica ID as a URL parameter.
 *     tags: [Problematicas]
 *     parameters:
 *       - name: id_problematica
 *         in: path
 *         required: true
 *         description: Unique identifier of the Problematica to be deleted
 *         type: integer
 *       - name: x-access-token
 *         in: header
 *         description: Token generated upon login to authorize the request.
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Problematica deleted successfully
 *       403:
 *         description: Access restricted to administrators only
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access restricted to administrators only
 *       404:
 *         description: Problematica not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Problematica not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while deleting the problematic
 */


/**
 * @swagger
 * /api/problematicas/publicacion/{id_problematica}:
 *   put:
 *     summary: Update the publication status of a Problematica
 *     description: This endpoint allows administrators to update the publication status of a Problematica. It requires a valid JWT token and the user must have the ADMINISTRADOR role. The request must include the Problematica ID as a URL parameter and the published status in the request body.
 *     tags: [Problematicas]
 *     parameters:
 *       - name: id_problematica
 *         in: path
 *         required: true
 *         description: Unique identifier of the Problematica to update the publication
 *         type: integer
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
 *               publicado:
 *                 type: boolean
 *                 description: Indicates if the Problematica should be published
 *                 example: true
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Publication updated successfully.
 *       403:
 *         description: Access denied. Only administrators can update publications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied. Only administrators can update publications.
 *       404:
 *         description: Problematica not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Problem not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */

/**
 * @swagger
 * /api/problematicas/solicitudes:
 *   get:
 *     summary: Get all unvalidated solicitudes
 *     description: This endpoint retrieves all unvalidated solicitudes. It requires a valid JWT token and the user must have the ADMINISTRADOR role.
 *     tags: [Problematicas]
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Token generated upon login to authorize the request.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of unvalidated solicitudes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_problematica:
 *                     type: integer
 *                     description: Unique identifier for the Problematica
 *                   titulo:
 *                     type: string
 *                     description: Title of the Problematica
 *                   planteamiento:
 *                     type: string
 *                     description: Problem statement
 *                   causas:
 *                     type: string
 *                     description: Causes of the Problematica
 *                   efectos:
 *                     type: string
 *                     description: Effects of the Problematica
 *                   que:
 *                     type: string
 *                     description: Description of the Problematica
 *                   como:
 *                     type: string
 *                     description: How the Problematica is addressed
 *                   para_que:
 *                     type: string
 *                     description: Purpose of the Problematica
 *                   cuando:
 *                     type: string
 *                     description: When the Problematica occurred
 *                   contacto:
 *                     type: string
 *                     description: Contact information
 *                   contacto_nombre:
 *                     type: string
 *                     description: Contact name information
 *                   contacto_cargo:
 *                     type: string
 *                     description: Contact position information
 *                   telefono:
 *                     type: integer
 *                     description: Phone number of the contact
 *                   telefono_institucional:
 *                     type: integer
 *                     description: Institutional phone number of the contact
 *                   zona:
 *                     type: string
 *                     description: Zone related to the Problematica
 *                   publicado:
 *                     type: string
 *                     format: date-time
 *                     description: Publication date
 *                   activo:
 *                     type: boolean
 *                     description: Indicates if the Problematica is active
 *                   validado:
 *                     type: boolean
 *                     description: Indicates if the Problematica is validated
 *                   actualizado:
 *                     type: string
 *                     format: date-time
 *                     description: Last updated date
 *                   creado:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date
 *                   usuario:
 *                     type: object
 *                     description: User who created the Problematica
 *                     properties:
 *                       id_usuario:
 *                         type: integer
 *                         description: User ID
 *                       nombre_usuario:
 *                         type: string
 *                         description: Username
 *                       email_usuario:
 *                         type: string
 *                         description: Email of the user
 *                   solicitante_id:
 *                     type: integer
 *                     description: ID of the requester
 *                   solicitante:
 *                     type: object
 *                     description: Requester details
 *                   carreras:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_carrera:
 *                           type: integer
 *                           description: ID of the career
 *                         nombre_carrera:
 *                           type: string
 *                           description: Name of the career
 *       403:
 *         description: Access restricted to administrators only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access restricted to administrators only.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */


/**
 * @swagger
 * /api/problematicas/registros:
 *   get:
 *     summary: Get problematicas associated with the authenticated entity user
 *     description: This endpoint retrieves all problematicas associated with the authenticated user who has the ENTIDAD role. It requires a valid JWT token for authentication.
 *     tags: [Problematicas]
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Token generated upon login to authorize the request.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of problematicas associated with the user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_problematica:
 *                     type: integer
 *                     description: Unique identifier for the Problematica
 *                   titulo:
 *                     type: string
 *                     description: Title of the Problematica
 *                   planteamiento:
 *                     type: string
 *                     description: Problem statement
 *                   causas:
 *                     type: string
 *                     description: Causes of the Problematica
 *                   efectos:
 *                     type: string
 *                     description: Effects of the Problematica
 *                   que:
 *                     type: string
 *                     description: Description of the Problematica
 *                   como:
 *                     type: string
 *                     description: How the Problematica is addressed
 *                   para_que:
 *                     type: string
 *                     description: Purpose of the Problematica
 *                   cuando:
 *                     type: string
 *                     description: When the Problematica occurred
 *                   contacto:
 *                     type: string
 *                     description: Contact information
 *                   contacto_nombre:
 *                     type: string
 *                     description: Contact name information
 *                   contacto_cargo:
 *                     type: string
 *                     description: Contact position information
 *                   telefono:
 *                     type: integer
 *                     description: Phone number of the contact
 *                   telefono_institucional:
 *                     type: integer
 *                     description: Institutional phone number of the contact
 *                   zona:
 *                     type: string
 *                     description: Zone related to the Problematica
 *                   validado:
 *                     type: boolean
 *                     description: Indicates if the Problematica is validated
 *                   publicado:
 *                     type: string
 *                     format: date-time
 *                     description: Publication date
 *                   actualizado:
 *                     type: string
 *                     format: date-time
 *                     description: Last updated date
 *                   creado:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date
 *                   usuario:
 *                     type: object
 *                     description: User who created the Problematica
 *                     properties:
 *                       id_usuario:
 *                         type: integer
 *                         description: User ID
 *                       nombre_usuario:
 *                         type: string
 *                         description: Username
 *                       email_usuario:
 *                         type: string
 *                         description: Email of the user
 *                   solicitante_id:
 *                     type: integer
 *                     description: ID of the requester
 *                   solicitante:
 *                     type: object
 *                     description: Requester details
 *                   carreras:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_carrera:
 *                           type: integer
 *                           description: ID of the career
 *                         nombre_carrera:
 *                           type: string
 *                           description: Name of the career
 *       403:
 *         description: Access restricted to entities only.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Access restricted to entities only.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
