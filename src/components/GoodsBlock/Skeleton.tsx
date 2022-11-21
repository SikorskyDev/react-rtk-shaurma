import React from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"


// https://skeletonreact.com/
export const Skeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="125" cy="181" r="101" />
        <rect x="9" y="300" rx="10" ry="10" width="249" height="25" />
        <rect x="59" y="425" rx="0" ry="0" width="1" height="1" />
        <rect x="8" y="352" rx="10" ry="10" width="249" height="75" />
        <rect x="112" y="448" rx="0" ry="0" width="143" height="46" />
        <rect x="12" y="452" rx="0" ry="0" width="61" height="46" />
    </ContentLoader>
)

