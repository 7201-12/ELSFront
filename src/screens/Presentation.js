import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";

const Presentation = () => {
    const docs = [
        { uri: require("../presentations/presentation.pdf") },
    ]

    return (
        <>
            <div>
                <DocViewer pluginRenderers={DocViewerRenderers}
                       documents={docs} />
            </div>
        </>
    )
}

export default Presentation