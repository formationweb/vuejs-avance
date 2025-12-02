import axios from "axios";
import {
  beforeEach,
  describe,
  vi,
  type Mock,
  test,
  expect,
  afterEach,
} from "vitest";
import { useAuth } from "../useAuth";
import { mount } from "@vue/test-utils";
import { AuthService } from "../../services/AuthService";
import { inject } from "vue";

describe("useAuth Composable", () => {
  let mockService: {
    login: ReturnType<typeof vi.fn>;
  };
  let composable: any

  beforeEach(() => {
    mockService = {
      login: vi.fn(),
    };
    mount(
      {
        template: "none",
        setup() {
            composable = useAuth()
        }
      },
      {
        global: {
            provide: {
                authService: mockService,
            },
        }
      }
    );
  });

  afterEach(() => {
    mockService.login.mockReset();
  });

  test("appelle login avec bons paramètres", async () => {
    const { email, password, login } = composable
    email.value = "ana@test.com";
    password.value = "azerty";

    await login();

    expect(mockService.login).toHaveBeenCalled();
  });
});
