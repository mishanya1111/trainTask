interface OverviewProps {
    artistDisplay: string;
    dimensions: string;
    creditLine: string;
    placeOfOrigin: string;
    isPublicDomain: boolean;
}

const Overview: React.FC<OverviewProps> = ({
    artistDisplay,
    dimensions,
    creditLine,
    placeOfOrigin,
    isPublicDomain
}) => (
    <div className="overview">
        <h3>Overview</h3>
        <p>
            <strong>Artist nationality:</strong> {artistDisplay}
        </p>
        <p>
            <strong>Dimensions:</strong> {dimensions}
        </p>
        <p>
            <strong>Credit Line:</strong> {creditLine}
        </p>
        <p>
            <strong>Repository:</strong> {placeOfOrigin}
        </p>
        <p>{isPublicDomain ? 'Public' : 'Private'}</p>
    </div>
);

export default Overview;
