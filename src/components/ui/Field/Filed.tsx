import { HTMLInputTypeAttribute, forwardRef, useState } from 'react'
import { TypeInputProps } from './Field.types'
import cn from 'clsx'

import styles from './Field.module.scss'

export const Field = forwardRef<HTMLInputElement, TypeInputProps>(
	({ error, type: initialType, style, Icon, className, ...rest }, ref) => {
		// const [type, setType] = useState<HTMLInputTypeAttribute | undefined>(
		// 	initialType || 'text'
		// )

		return (
			<label className={cn(styles.field, className)} style={style}>
				{Icon && (
					<div className={styles.icon}>
						<Icon />
					</div>
				)}
				<input ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		)
	}
)
