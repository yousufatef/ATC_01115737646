const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-purple-50 ">
            {children}
        </div>
    );
}
export default layout;