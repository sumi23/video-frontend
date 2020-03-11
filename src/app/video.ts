import { ReferenceArtifact } from './reference-artifact';
import { SampleProgram } from './sample-program';
import { Referenceurl } from './referenceurl';

export class Video {

    name:string;
    displayName:string;
    url:string;
    duration:string;
    tags:string;
    status:string;
    description:string;
    file:string;
    level:string;
    category:string;
    referenceArtifact:Array<ReferenceArtifact>;
    sampleProgram:Array<SampleProgram>;
    referenceUrl:Array<Referenceurl>;
}

