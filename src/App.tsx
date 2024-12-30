import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';
import { treeData } from './data/treeData';

export default function App() {
    return (
        <div className="min-h-screen bg-[#1C3559]">
            <PageHeader />
            <div className="relative">
                <AITree data={treeData} />
            </div>
        </div>
    );
}