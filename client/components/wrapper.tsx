interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    spacing?: boolean; // New prop to decide whether to apply vertical spacing
    spacingClassName?: string;
}

export const MainContainer = ({ children, className = "", spacing = false, spacingClassName = "", ...props }: MainContainerProps) => {
    return (
        <div 
            className={`mx-auto px-2 sm:px-6 lg:px-8 ${spacing ? 'my-6' : ''} ${spacingClassName} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
