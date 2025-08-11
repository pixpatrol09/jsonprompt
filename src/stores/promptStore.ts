import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PromptData {
  fidelity_priority: string
  task: string
  input_image: string
  background_description: string
  instructions: {
    preserve_subject: boolean
    preserve_details: boolean
    pose_locked: boolean
    no_face_or_garment_modification: boolean
    scale_and_alignment: string
    integration_style: string
    lighting_match: boolean
    shadow_blending: boolean
    color_grading: string
    output_resolution: string
    logos: string
    product_features: string
  }
  model_lock: {
    preserve_proportions: boolean
    feet_position_locked: boolean
    head_position_locked: boolean
    arms_position_locked: boolean
    legs_position_locked: boolean
    outfit_position_locked: boolean
    no_body_warping: boolean
    no_pose_generation: boolean
    no_scale_distortion: boolean
    camera_perspective_locked: boolean
    preserve_skin_tone: boolean
    preserve_race: boolean
    preserve_face_identity: boolean
    preserve_subject_position: boolean
    preserve_frame_ratio: boolean
  }
  additional_details: {
    visual_style: string
    lighting: string
    integration_priority: string
  }
}

interface PromptState {
  currentStep: number
  promptData: PromptData
  presets: Record<string, PromptData>
  updatePromptData: (data: Partial<PromptData>) => void
  setCurrentStep: (step: number) => void
  resetPrompt: () => void
  savePreset: (name: string, data: PromptData) => void
  loadPreset: (name: string) => void
  exportJSON: () => string
  importJSON: (json: string) => boolean
}

const defaultPromptData: PromptData = {
  fidelity_priority: "",
  task: "background_integration",
  input_image: "",
  background_description: "",
  instructions: {
    preserve_subject: true,
    preserve_details: true,
    pose_locked: true,
    no_face_or_garment_modification: true,
    scale_and_alignment: "match original proportions and placement",
    integration_style: "photorealistic",
    lighting_match: true,
    shadow_blending: true,
    color_grading: "match background",
    output_resolution: "same_as_input",
    logos: "Preserve original logo shape, size, and position",
    product_features: "Preserve garment material, color, fit, silhouette, and texture. No hallucinations or alterations."
  },
  model_lock: {
    preserve_proportions: true,
    feet_position_locked: true,
    head_position_locked: true,
    arms_position_locked: true,
    legs_position_locked: true,
    outfit_position_locked: true,
    no_body_warping: true,
    no_pose_generation: true,
    no_scale_distortion: true,
    camera_perspective_locked: true,
    preserve_skin_tone: true,
    preserve_race: true,
    preserve_face_identity: true,
    preserve_subject_position: true,
    preserve_frame_ratio: true
  },
  additional_details: {
    visual_style: "Editorial, cinematic, with a focus on dynamic athletic posture",
    lighting: "Natural midday with soft shadows blending seamlessly into background, capturing an energetic yet relaxed mood",
    integration_priority: "Scene realism must not override model or product accuracy"
  }
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set, get) => ({
      currentStep: -1, // Start with welcome screen
      promptData: defaultPromptData,
      presets: {},
      
      updatePromptData: (data) => set((state) => ({
        promptData: { ...state.promptData, ...data }
      })),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetPrompt: () => set({ promptData: defaultPromptData, currentStep: -1 }),
      
      savePreset: (name, data) => set((state) => ({
        presets: { ...state.presets, [name]: data }
      })),
      
      loadPreset: (name) => {
        const preset = get().presets[name]
        if (preset) {
          set({ promptData: preset })
        }
      },
      
      exportJSON: () => JSON.stringify(get().promptData, null, 2),
      
      importJSON: (json) => {
        try {
          const data = JSON.parse(json)
          set({ promptData: data })
          return true
        } catch {
          return false
        }
      }
    }),
    {
      name: 'prompt-storage',
    }
  )
)
