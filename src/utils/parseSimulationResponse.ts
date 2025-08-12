import type { SimulationResult } from "../types/form";

export const parseSimulationResponse = (response: string): SimulationResult => {
  try {
    // Remove any potential leading/trailing whitespace and newlines
    const cleanResponse = response.trim();
    
    // Find the start of the timeline array and lastMessage
    const timelineStart = cleanResponse.indexOf('[');
    const timelineEnd = cleanResponse.lastIndexOf(']') + 1;
    const lastMessageStart = cleanResponse.indexOf('"lastMessage"');
    
    if (timelineStart === -1 || timelineEnd === -1 || lastMessageStart === -1) {
      throw new Error('Invalid response format');
    }
    
    // Extract timeline array
    const timelineJson = cleanResponse.substring(timelineStart, timelineEnd);
    const timeline = JSON.parse(timelineJson);
    
    // Extract lastMessage
    const lastMessageSection = cleanResponse.substring(lastMessageStart);
    const lastMessageMatch = lastMessageSection.match(/"lastMessage":\s*"([^"]+)"/);
    
    if (!lastMessageMatch) {
      throw new Error('Could not extract lastMessage');
    }
    
    const lastMessage = lastMessageMatch[1];
    
    return {
      timeline,
      lastMessage
    };
  } catch (error) {
    console.error('Failed to parse simulation response:', error);
    console.error('Raw response:', response);
    
    // Return fallback result
    return {
      timeline: [
        {
          title: "파싱 오류",
          contents: "응답을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요."
        }
      ],
      lastMessage: "다시 시도해보세요."
    };
  }
};