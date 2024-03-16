import * as aws from 'aws-sdk'
import { ImagemDto } from 'src/produtos/dto/create-produto.dto'

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
	endpoint,
	credentials: {
		accessKeyId: process.env.KEY_ID,
		secretAccessKey: process.env.APP_KEY
	}
})

export const UploadedFile = async (data: ImagemDto) => {
	const imagem = await s3
		.upload({
			Bucket: process.env.KEY_NAME,
			Key: data.originalname,
			Body: data.buffer,
			ContentType: data.mimetype
		})
		.promise()

	return {
		path: imagem.Key,
		url: `https://${process.env.KEY_NAME}.${process.env.ENDPOINT_S3}/${imagem.Key}`
	}
}

export const deleteFile = async (data: string) => {
	await s3
		.deleteObject({
			Bucket: process.env.KEY_NAME,
			Key: data
		})
		.promise()
}
