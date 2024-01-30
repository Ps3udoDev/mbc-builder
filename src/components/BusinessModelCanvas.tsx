import React, { useEffect, useState } from 'react'
import CanvasSection from './CanvasSection';
import { MbcElementInstance } from './MbcElements';
import useDesigner from './hooks/useDesigner';

export default function BusinessModelCanvas() {
  const { setElements, elements, addElement } = useDesigner();
  const [keyPartners, setKeyPartners] = useState<MbcElementInstance[]>([]);
  const [keyActivities, setKeyActivities] = useState<MbcElementInstance[]>([]);
  const [customerRelationships, setCustomerRelationships] = useState<MbcElementInstance[]>([]);
  const [customerSegments, setCustomerSegments] = useState<MbcElementInstance[]>([]);
  const [keyResources, setKeyResources] = useState<MbcElementInstance[]>([]);
  const [channels, setChannels] =useState<MbcElementInstance[]>([]);
  const [costStructure, setCostStructure] = useState<MbcElementInstance[]>([]);
  const [revenueStreams, setRevenueStreams] = useState<MbcElementInstance[]>([]);
  const [valuePropositions, setValuePropositions] = useState<MbcElementInstance[]>([]);

  useEffect(() => {
    const filterElementsForSections = () => {
      const keyPartnersElements = elements.filter((element) => element.id.startsWith('keyPartners'));
      setKeyPartners(keyPartnersElements);

      const keyActivitiesElements = elements.filter((element) => element.id.startsWith('keyActivities'));
      setKeyActivities(keyActivitiesElements);

      const valuePropositionsElements = elements.filter((element) => element.id.startsWith('valuePropositions'));
      setValuePropositions(valuePropositionsElements);

      const customerRelationshipsElements = elements.filter((element) => element.id.startsWith('customerRelationships'));
      setCustomerRelationships(customerRelationshipsElements);

      const customerSegmentsElements = elements.filter((element) => element.id.startsWith('customerSegments'));
      setCustomerSegments(customerSegmentsElements);

      const keyResourcesElements = elements.filter((element) => element.id.startsWith('keyResources'));
      setKeyResources(keyResourcesElements);

      const channelsElements = elements.filter((element) => element.id.startsWith('channels'));
      setChannels(channelsElements);

      const costStructureElements = elements.filter((element) => element.id.startsWith('costStructure'));
      setCostStructure(costStructureElements);

      const revenueStreamsElements = elements.filter((element) => element.id.startsWith('revenueStreams'));
      setRevenueStreams(revenueStreamsElements);
    };

    filterElementsForSections();
  }, [elements]);

  console.log('this is the elements of bussines canvas', elements)
  return (
    <div className="grid grid-cols-12 grid-rows-3 gap-4 p-4 bg-background-designer h-full">
      {/* Key Partners */}
      <CanvasSection
        title="Key Partners"
        className="col-span-2 row-span-2"
        sectionElements={keyPartners}
        setSectionElements={setKeyPartners}
        typeSection={'keyPartners'}

      />
      {/* Key Activities */}
      <CanvasSection
        title="Key Activities"
        className="col-span-2 row-span-1"
        sectionElements={keyActivities}
        setSectionElements={setKeyActivities}
        typeSection={'keyActivities'}
      />
      {/* Key Resources */}

      {/* Value Propositions */}
      <CanvasSection
        title="Value Propositions"
        className="col-span-4 row-span-2"
        sectionElements={valuePropositions}
        setSectionElements={setValuePropositions}
        typeSection={'valuePropositions'}
      />
      {/* Customer Relationships */}
      <CanvasSection
        title="Customer Relationships"
        className="col-span-2 row-span-1"
        sectionElements={customerRelationships}
        setSectionElements={setCustomerRelationships}
        typeSection={'customerRelationships'}
      />
      {/* Customer Segments */}
      <CanvasSection
        title="Customer Segments"
        className="col-span-2 row-span-2"
        sectionElements={customerSegments}
        setSectionElements={setCustomerSegments}
        typeSection={'customerSegments'}
      />
      <CanvasSection
        title="Key Resources"
        className="col-span-2 row-span-1"
        sectionElements={keyResources}
        setSectionElements={setKeyResources}
        typeSection={'keyResources'}
      />
      {/* Channels */}
      <CanvasSection
        title="Channels"
        className="col-span-2 row-span-1"
        sectionElements={channels}
        setSectionElements={setChannels}
        typeSection={'channels'}
      />
      {/* Cost Structure */}
      <CanvasSection
        title="Cost Structure"
        className="col-span-6 row-span-1"
        sectionElements={costStructure}
        setSectionElements={setCostStructure}
        typeSection={'costStructure'}
      />
      {/* Revenue Streams */}
      <CanvasSection
        title="Revenue Streams"
        className="col-span-6
         row-span-1"
        sectionElements={revenueStreams}
        setSectionElements={setRevenueStreams}
        typeSection={'revenueStreams'}
      />
    </div>
  );

}
